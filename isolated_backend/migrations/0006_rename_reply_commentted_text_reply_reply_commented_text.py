# Generated by Django 4.2.6 on 2023-10-08 16:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('isolated_backend', '0005_rename_user_comment_reply_reply_commentted_text'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reply',
            old_name='reply_commentted_text',
            new_name='reply_commented_text',
        ),
    ]
