# Generated by Django 5.0.6 on 2024-06-12 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0002_employee_employee_type_employee_phone_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='phone',
            field=models.CharField(default=22, max_length=20),
            preserve_default=False,
        ),
    ]
