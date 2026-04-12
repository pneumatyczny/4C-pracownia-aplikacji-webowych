#zadanie 4.1
"""
f = open("sygnaly.txt")
linie = f.readlines()
a=39
while(a<=1000):
    print(linie[a][9:10],end="")
    a+=40
"""
#zadanie 4.2
"""
f = open("sygnaly.txt")
linie = f.readlines()
a=0
big = 0
while(a<1000):
    cur = len(set(linie[a]))-1
    if(cur>big):
        big = cur
    a+=1
print(big)
a=0
while(a<1000):
    cur = len(set(linie[a]))-1
    if(cur==big):
        print(linie[a])
        break
    a+=1
"""
#zadanie 4.3
"""
f = open("sygnaly.txt")
linie = f.readlines()

def spelnia(s):
    s = s.strip()
    for i in range(len(s) - 1):
        if abs(ord(s[i]) - ord(s[i+1])) > 10:
            return False
    return True

a = 0
while a < 1000:
    if spelnia(linie[a]):
        print(linie[a])
    a += 1
"""
