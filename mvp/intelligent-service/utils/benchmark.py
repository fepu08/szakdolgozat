import os
import psutil
import time


def get_memory_usage():
    process = psutil.Process(os.getpid())
    return process.memory_info().rss  # in bytes


def print_memory_usage(memory_before, memory_after):
    print(f"Memory usage before: {get_memory_in_megabytes(memory_before)} MB")
    print(f"Memory usage after: {get_memory_in_megabytes(memory_after)} MB")


def get_memory_in_megabytes(memory):
    return f"{memory / (1024 * 1024):.2f}"


class TimeBenchmark:
    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.elapsed_time = None

    def start(self):
        if self.start_time:
            self.__clear()
        self.start_time = time.time()

    def stop(self):
        self.end_time = time.time()
        self.elapsed_time = self.end_time - self.start_time

    def print_elapsed_time(self):
        print(f"Elapsed time (seconds): {self.elapsed_time}")

    def __clear(self):
        self.start_time = None
        self.end_time = None
        self.elapsed_time = None
