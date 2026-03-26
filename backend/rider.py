class Rider:
    def __init__(self, name: str, shifts: list[dict], capacity: list[int]):
        self.name = name
        self.shifts = shifts
        self.capacity = capacity
        self.visits: list[dict] = []

    def to_dict(self):
        return {"name": self.name, "visits": self.visits}
