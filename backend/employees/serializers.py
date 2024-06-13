from rest_framework import serializers
from .models import Employee, Attendance




class EmployeeSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = Employee
        fields = "__all__"


    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}" 
    


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'    




            

        