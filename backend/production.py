from .settings import *  # noqa: F403
import dj_database_url
import os

ALLOWED_HOSTS = ['*']

DEBUG = os.environ.get('DEBUG', 'False') == 'True'
SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-dev-key')

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
}

DEBUG = os.environ.get('DEBUG', 'False') == 'True'
SECRET_KEY = "87vfyxwy5ov7*@1%*3gnrx0)2ck(e2a%f8e(f93e53#-wrb3w4"