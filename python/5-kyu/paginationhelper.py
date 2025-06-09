'''# PaginationHelper
# paginationhelper
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/515bb423de843ea99400000a
# Tags: Object-oriented Programming, Arrays, Algorithms
# Completed at: 2025-06-09

'''

# Solution goes here
import math

class PaginationHelper:
    
    # The constructor takes in an array of items and an integer indicating
    # how many items fit within a single page
    def __init__(self, collection, items_per_page):
        self.collection = collection
        self.items_per_page = items_per_page
    
    # returns the number of items within the entire collection
    def item_count(self):
        return len(self.collection)
    
    # returns the number of pages
    def page_count(self):
        if self.item_count() <= 0:
            return 0
        return math.ceil(self.item_count() / self.items_per_page)

    # returns the number of items on the given page. page_index is zero based
    # this method should return -1 for page_index values that are out of range
    def page_item_count(self, page_index):
        if page_index < 0 or page_index >= self.page_count():
            return -1
        if page_index < self.page_count() - 1:
            return self.items_per_page
        return len(self.collection) - ((self.page_count() - 1) * self.items_per_page)

    
    # determines what page an item at the given index is on. Zero based indexes.
    # this method should return -1 for item_index values that are out of range
    def page_index(self, item_index):
        if item_index < 0 or item_index >= self.item_count():
            return -1
        
        return item_index // self.items_per_page
