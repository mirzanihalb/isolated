# Generated by Django 4.2.6 on 2023-10-08 16:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('isolated_backend', '0006_rename_reply_commentted_text_reply_reply_commented_text'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reply',
            old_name='reply_commented_text',
            new_name='reply_commentted_text',
        ),
    ]
