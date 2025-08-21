from .settings import *  # noqa: F403
import dj_database_url
import os

DEBUG = False
ALLOWED_HOSTS = ['*']

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'railway',
        'USER': 'postgres',
        'PASSWORD': 'ZIQzSXEjTNyJuEzUrpBTBlhmhTAgVlso',
        'HOST': 'postgres.railway.internal',
        'PORT': '5432',
    }
}

DEBUG = os.environ.get('DEBUG', 'False') == 'True'
SECRET_KEY = "87vfyxwy5ov7*@1%*3gnrx0)2ck(e2a%f8e(f93e53#-wrb3w4"