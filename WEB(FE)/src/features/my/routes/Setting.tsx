import { Form, Button } from "@/components/Element";
import { Category } from "@/components/Element/Category";
import { SideNavbar } from "@/components/Element/SideNavbar";
import { ChangeEvent, useCallback, useState } from "react";

export const SettingPage = () => {

  const [nickname, setNickname] = useState('');
  const [tab, setTabNum] = useState(0);

  return (
    <div>
      <div className="flex">
        <div className="container max-w-sm ml-80 mt-24">
          <SideNavbar text="text-xl" label="회원정보 수정" margin="mb-12" tab={0}/>
          <SideNavbar text="text-xl" label="비밀번호 변경" margin="mb-12" tab={1}/>
          <SideNavbar text="text-xl" label="회원 탈퇴하기" margin="mb-12" tab={2}/>
        </div>

        <div className="flex flex-col ml-14">
          <div className="container max-w-sm mt-14">
            <h2 className="text-black font-bold text-2xl mt-10">닉네임</h2>
            <Form label="" type="text" onChange={(e)=>{setNickname(e.target.value)}} />
          </div>
          
          <div>
            <h2 className="text-black font-bold text-2xl py-6">
              관심 카테고리 설정
            </h2>
            <div className="flex flex-col mb-28">
              <div className="flex">
                <Category label="학습" />
                <Category label="운동" />
                <Category label="모닝루틴" />
              </div>
              <div className="flex">
                <Category label="경제" />
                <Category label="자기관리" />
                <Category label="진로" />
              </div>
              <div className="flex">
                <Category label="취미" />
                <Category label="정서" />
                <Category label="건강" />
              </div>
            </div>
          </div>

          <Button text="text-xl" label="수정하기" margin="mb-24" onClick={() => { }} />
          {/* 버튼의 좌우폭 줄여야하는데 레이아웃 폭 고정과 맞물렸는지 잘 안됩니다. */}

        </div>

      </div>


    </div>
  )
};
