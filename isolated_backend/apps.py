from django.apps import AppConfig


class IsolatedBackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'isolated_backend'
