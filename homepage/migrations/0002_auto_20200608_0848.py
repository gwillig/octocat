# Generated by Django 3.0.5 on 2020-06-08 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memory',
            name='blob_data_1',
            field=models.BinaryField(editable=True, null=True),
        ),
        migrations.AlterField(
            model_name='memory',
            name='blob_data_2',
            field=models.BinaryField(editable=True, null=True),
        ),
        migrations.AlterField(
            model_name='memory',
            name='blob_data_3',
            field=models.BinaryField(editable=True, null=True),
        ),
    ]
