from django.db import models
from accounts.models import User
from django.utils import timezone




class Employee(models.Model):
    GENDER =(
        ('Male' , 'Male'),
        ('Female' , 'Female'),
    )
    STATUS =(
        ('Active' , 'Active'),
        ('NotActive' , 'NotActive'),
    )

    EMPLOYEETYPE = (
    ('FULL_TIME','Full-Time'),
    ('PART_TIME','Part-Time'),
    ('CONTRACT','Contract'),
    ('INTERN','Intern'),
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='employee_images', default='default.png',blank=True,null=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_joined = models.DateTimeField(default=timezone.now)
    position = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    gender = models.CharField(max_length=100, choices=GENDER)
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=100, choices=STATUS)
    employee_type = models.CharField(max_length=100, choices=EMPLOYEETYPE)


    def __str__(self):
        return f'{self.first_name} - {self.last_name}'



class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Leave', 'Leave'),
    ]
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f'{self.employee.first_name} - {self.date}'