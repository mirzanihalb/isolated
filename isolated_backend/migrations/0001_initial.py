# Generated by Django 4.2.6 on 2023-10-08 14:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_body', models.CharField(max_length=255)),
                ('commented_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField()),
                ('gender', models.CharField(max_length=10)),
                ('phone_number', models.CharField(max_length=15)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roomcode', models.IntegerField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('user_room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_room', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reply_body', models.CharField(max_length=255)),
                ('replied_at', models.DateField(auto_now_add=True)),
                ('user_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_comment_reply', to='isolated_backend.comment')),
                ('user_reply', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_reply', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rooms_comment', to='isolated_backend.rooms'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user_comment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_comment', to=settings.AUTH_USER_MODEL),
        ),
    ]
