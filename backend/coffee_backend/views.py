from django.http import HttpResponse

def home(request):
    return HttpResponse("Coffee Shop Backend Running ☕")