from django.db import models

from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="user_profile")
    age = models.IntegerField()
    gender = models.CharField(max_length = 10)
    phone_number = models.CharField(max_length=15)

class Room(models.Model):
    roomcode = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    user_room = models.ForeignKey(User,on_delete=models.CASCADE,related_name="users_room")

    def __str__(self):
        return str(self.roomcode)

class Comment(models.Model):
    comment_body = models.CharField(max_length=255)
    commented_at = models.DateField(auto_now_add=True)
    user_comment = models.ForeignKey(User,on_delete=models.CASCADE,related_name="users_comment")
    room = models.ForeignKey(Room,on_delete=models.CASCADE,related_name="rooms_comment")
    
    def __str__(self):
        return str(self.comment_body)

class Reply(models.Model):
    reply_body = models.CharField(max_length=255)
    replied_at =  models.DateField(auto_now_add=True)
    user_reply = models.ForeignKey(User,on_delete=models.CASCADE,related_name="users_reply")
    reply_commentted_text = models.ForeignKey(Comment,on_delete=models.CASCADE,related_name="users_comment_reply")

    def __str__(self):
        return str(self.reply_body) +" of "+ str(self.reply_commentted_text) + " by " + str(self.user_reply)