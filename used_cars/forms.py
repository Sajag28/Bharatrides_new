from django import forms
from .models import Booking

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['car','city','date', 'time_slot']
        widgets = {
            'date': forms.SelectDateWidget(),
        }
