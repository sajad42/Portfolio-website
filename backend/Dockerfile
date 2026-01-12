# 1. Use the official AWS Lambda Python base image
FROM public.ecr.aws/lambda/python:3.11

# 2. Copy requirements.txt to the Lambda task root
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# 3. Install dependencies directly into the task root
RUN pip install -r requirements.txt

# 4. Copy all your backend code into the task root
COPY . ${LAMBDA_TASK_ROOT}

# 5. Set the CMD to your Mangum handler
# This assumes your file is main.py and your Mangum wrapper is named 'handler'
CMD [ "main.handler" ]