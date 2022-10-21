import gensim
import torch
import consql as cs
from u2v import u2v  # user벡터와 유사한 루틴을 순서대로 나열

# def user(i):
#     return 'SELECT * FROM user_routine WHERE user_no='+str(i)+';'

def r12n(i):
    print(u2v(i))
    cs.ex('SELECT * FROM user_routine WHERE user_no='+str(i)+';')
    cat=cs.ex('SELECT category FROM user_category WHERE user_no='+str(i)+';')  # user_category에 category가 왜 중복되어 있는지?
    cat=[c[0] for c in cat]
    cat=list(set(cat))  #중복 제거
    # q=[[]for _ in range(len(cat))]
    print(cat)
    ret=[i+1 for i in range(30)]  # 30을 루틴 개수로 바꿔야 or 텐서 개수
    id=[0 for i in range(31)]
    print(ret)
    print(id)
    cd={c:1 for c in cat}  # category->숫자 dictionary
    for c in cat:
        routine=cs.ex('SELECT id FROM routine WHERE category = "'+str(c)+'";')
        routine=[r[0] for r in routine]  # ((ㅁ,),(ㅎ,),....)
        # rid=[0 for i in range(len(routine))]
        print(routine)
        for r in u2v(i).tolist():
            if r in routine:
                id[r]=cd[c]
                cd[c]+=1 
                # ret.append(r)
    ret.sort(key=lambda x:-id[x])
    print(ret)
    return ret

# cat=[]
# with open('./AI/r5e.json')as f:
#     j=json.load(f)
#     cat=input().split()
#     l={}
#     for c in cat:
#         print(c)
#         l[c]=list(filter(lambda x:x['category']==c,j['routines']))
#         print(l[c])
#         l[c].sort(key=lambda x:(x['participants']),reverse=1)
#         print(l[c])
#     print(l)

r12n(1)