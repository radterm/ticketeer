virenv:
	virtualenv -p python3 virenv && \
	. virenv/bin/activate && \
	pip install -r requirements.txt
