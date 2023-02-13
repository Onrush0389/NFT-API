import asyncio
import threading

isValid = True

value = 1 if isValid else 0 # let value = isValid ? 1 : 0
numbers = [1, 2, 3]
values = [1 + num if num < 2 else num for num in numbers]
values = map(lambda num: 1 + num, numbers)
values = [num + 1 for num in numbers]
values = [num for num in numbers if num < 2]

def generator():
    for i in range(10):
        yield i

values = generator()
# <Generator object generator at 0x7f9b1c0b9f10>
values = list(generator())

async def helloWorld(value: bool):
    await asyncio.sleep(1)
    print('Hello World')
    isValid = value


async def main():
    # 0
    await helloWorld()
    await helloWorld()
    await helloWorld()
