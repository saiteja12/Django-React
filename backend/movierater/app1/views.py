from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import action 
from rest_framework import viewsets,status
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Movie, Rating
from .serializers import MovieSerializer,RatingSerializer,UserSerializer

# Create your views here.

class UserViewset(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer


class MovieViewset(viewsets.ModelViewSet):
    queryset=Movie.objects.all()
    serializer_class=MovieSerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)

    @action(detail=True, methods=['POST'])
    def rate_movie(self,request,pk=None):
        if 'stars' in request.data:
            movie = Movie.objects.get(id=pk)
            stars=request.data['stars']
            user=request.user
            # user=User.objects.get(id=1)
            print(user)
            try:
                rating=Rating.objects.get(user=user.id,movie=movie.id)
                rating.stars=stars
                rating.save()
                serializer=RatingSerializer(rating,many=False)
                response={'message':'Rating Updated','result':serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating=Rating.objects.create(user=user,movie=movie,stars=stars)
                serializer=RatingSerializer(rating,many=False)
                response={'message':'Rating created','result':serializer.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response={'message':'You need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)            


class RatingViewset(viewsets.ModelViewSet):
    queryset=Rating.objects.all()
    serializer_class=RatingSerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)

    def create(self,request,*args,**kwargs):
        response={'message':'You cannot create like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)  
    def update(self,request,*args,**kwargs):
        response={'message':'You cannot update like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    
