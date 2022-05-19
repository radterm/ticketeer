virenv:
	virtualenv -p python3 virenv && \
	. virenv/bin/activate && \
	pip install -r requirements.txt

migrate:
	. virenv/bin/activate && \
	python jira_min/manage.py makemigrations && \
	python jira_min/manage.py migrate

run:
	. virenv/bin/activate && \
	python jira_min/manage.py runserver 8000
