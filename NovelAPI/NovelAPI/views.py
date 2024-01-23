from django.http import HttpResponse

def say_hello(request):
    return HttpResponse("test EndPoint123")


def say_goodbye(request, test):
    return HttpResponse(f"wow123123{test}", )


def home(request):
    return HttpResponse(f"Hello {request}")

