# WhereToGo

### Локальный запуск

Для последующих действий **необходимо** установить **Python 3.9**  
Все команды выполнять **не выходя** из консоли!

1. Откройте папку проекта и, для создания виртуального оркружения, выполните:

	> python -m venv venv

2. Для активации виртуального окружения выполните:

	- **Linux**:

	> source venv/bin/activate

	- **Windows**

	> venv\Scripts\activate

3. Для скачивания зависимостей:

	> pip install -r requirements.txt

4. Для компиляции локалей:

	> django-admin compilemessages

5. Перейдите в папку wheretogo **внутри** проекта и,  
для запуска сервера, выполните:

	> python manage.py runserver
