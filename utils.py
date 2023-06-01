import time
import datetime
import random

def get_random_time(MIN_TIME, MAX_TIME):
    mintime_ts = int(time.mktime(MIN_TIME.timetuple()))
    maxtime_ts = int(time.mktime(MAX_TIME.timetuple()))
    random_ts = random.randint(mintime_ts, maxtime_ts)
    return datetime.datetime.fromtimestamp(random_ts)