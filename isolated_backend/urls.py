from django.urls import path
from .views import register,login_user,contact,logout_user,isolated_rooms,room_details,question,createroom,authen


urlpatterns = [
    path("register/",register,name="register"),
    path("login/",login_user,name="login"),
    path('contact',contact,name="contact"),
    path('logout/',logout_user,name="logout_user"),
    path('isolated_rooms/',isolated_rooms,name='isolated_rooms'),
    path('room_details/',room_details,name='room_details'),
    path('post_question/',question,name="question"),
    path("createroom/",createroom,name="createroom"),
    path("isauthenticated/",authen,name="isauthenticated")
    
]