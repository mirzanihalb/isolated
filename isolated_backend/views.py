from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from isolated_backend.models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from .models import Room,Comment,Reply
from datetime import datetime

import json

# Create your views here.
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        firstname = data.get('firstname')
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password!=confirm_password:
            return JsonResponse({'success':False,'message':"passwords doesnt match"})
        hashed_password = make_password(password)
        new_object = User(username=username,password=hashed_password,first_name=firstname,email=email)
        new_object.save()
        # print(new_object)
        return JsonResponse({'success':"True",'message':"Registration Succesfull"})


@csrf_exempt
def login_user(request):
    
     if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        # print(username,password)
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request,user)

                return JsonResponse({'success': "True", 'message': 'Login successful'})
                
            else:
                return JsonResponse({'success': "False", 'message': 'User Not found'})
                
        else:
            return JsonResponse({'success': "False", 'message': 'Login Unsuccessful'})
            
    

@csrf_exempt
def contact(request):
    return JsonResponse({"messsage:from contact"})

@login_required
def logout_user(request):
    
    logout(request)
    return JsonResponse({"success":"True","message":"logged out"})

@login_required
@csrf_exempt
def isolated_rooms(request):
    if request.method=="GET":
        user_rooms = Room.objects.filter(user_room=request.user)
        room_dicts = list(user_rooms.values('roomcode'))

        # print(room_dicts)
        return JsonResponse({"room_dicts":room_dicts})

@login_required
@csrf_exempt 
def room_details(request):
    if request.method=="POST":
        data = json.loads(request.body)
        
        roomnumber = data.get("id")
        
        # this i used
        # room_id = Room.objects.get(roomcode=roomnumber).id
        room_id = Room.objects.filter(roomcode=roomnumber).first()
        if room_id==None:
            return JsonResponse({"success":"false"})
        

        # dowm line is important to get the comments of a room
        comments_obj = Comment.objects.filter(room=room_id)
        # print(comments_obj)
        # print(comments_obj[0].id)
        # val = comments_obj[0].id

        d = []
        
        for val in comments_obj:
            temp = [[val.id,val.comment_body]]
            val_id = val.id
            replies_of_this_comment_obj = Reply.objects.filter(reply_commentted_text=val_id)
            # 
            l = []
            for val_reply in replies_of_this_comment_obj:
                l.append(val_reply.reply_body)
            temp.append(l)
            d.append(temp)
            # print(d)
            # print(val)
            # print(val.id)
        # print(d)


        # this down line should be inside a for loop to get all the replies of a particular comment
        # print(Reply.objects.filter(reply_commentted_text=val)[0].reply_body)


        # {key:val}
        # {[{comment:replies_of_this_comment}]}
        
        return JsonResponse({"success":"true","room_content":d[::-1]})


@login_required
@csrf_exempt
def question(request):
    data = json.loads(request.body)
    if data.get("type")=="reply":
        # print(data.get("comment_id"))
        # print(request.user)
        comm = Comment.objects.filter(id=data.get("comment_id")).first()
        new_obj = Reply(reply_body=data.get("reply_body"),user_reply=request.user,reply_commentted_text=comm)
        new_obj.save()
        # print(new_obj)
        return JsonResponse({"success":"True","message":"reply added"})
    elif data.get("type")=="comment":
        # print(data)
        val = data.get("comment_body")
        
        # room = Room.objects.filter(id=data.get("room")).first()
        room = Room.objects.get(roomcode=data.get("room"))
        # print(room)
        
        new_obj = Comment(comment_body=val,user_comment=request.user,room=room)
        new_obj.save()
        print(new_obj)
        return JsonResponse({"success":"True","message":"Comment added"})

@login_required
@csrf_exempt
def createroom(request):
    epoch_timestamp = int(datetime.now().timestamp())
    new_obj = Room(roomcode=epoch_timestamp,user_room=request.user)
    new_obj.save()
    
    return JsonResponse({"success":"True","roomcode":epoch_timestamp})


def authen(request):
    if request.user.is_authenticated:
        return JsonResponse({"success":"true"})
    return JsonResponse({"success":"false"})