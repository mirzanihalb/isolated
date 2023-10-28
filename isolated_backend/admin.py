from django.contrib import admin

from .models import UserProfile,Room,Comment,Reply

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Room)
admin.site.register(Comment)
admin.site.register(Reply)
