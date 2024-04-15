class TimeBenchmark:
    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.elapsed_time = None

    def start(self):
        if(self.start_time):
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