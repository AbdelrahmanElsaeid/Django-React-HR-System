# Generated by Django 5.0.6 on 2024-06-12 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='employee_type',
            field=models.CharField(choices=[('FULL_TIME', 'Full-Time'), ('PART_TIME', 'Part-Time'), ('CONTRACT', 'Contract'), ('INTERN', 'Intern')], default=2, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employee',
            name='phone',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='status',
            field=models.CharField(choices=[('Active', 'Active'), ('NotActive', 'NotActive')], default=2, max_length=100),
            preserve_default=False,
        ),
    ]
