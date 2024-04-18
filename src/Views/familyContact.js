import DialogWindow from "../Components/dialogWindow";
import DialogChoose from "../Components/dialogChoose";
import "./familyContact.scss";

const contacts = [
  {
    id: 1,
    name: "林天宇",
    avatar: "https://en.pimg.jp/065/551/508/1/65551508.jpg",
  },
  {
    id: 2,
    name: "马云",
    avatar:
      "https://www.132jk.com/zb_users/upload/2023/10/202310131697171319680390.jpg",
  },
  {
    id: 3,
    name: "张伟",
    avatar: "https://pic.616pic.com/ys_img/01/17/47/eVnQ1JdIY4.jpg",
  },
  {
    id: 4,
    name: "林天宇2",
    avatar: "https://img.nanrentu.cc/listImg/c2023/11/09/eiqevgslyk0.jpg",
  },
  {
    id: 5,
    name: "林天宇3",
    avatar: "https://static-cse.canva.cn/blob/353796/1600w-1tBhPU1AXV4.jpg",
  },
  {
    id: 6,
    name: "林天宇4",
    avatar: "https://image.16pic.com/00/93/95/16pic_9395911_s.jpg",
  },
];
const contact = () => {
  return (
    <div className="contact">
      <div className={"contact-left"}>
        <DialogChoose contacts={contacts}></DialogChoose>
      </div>
      <div className={"contact-main"}>
        <DialogWindow></DialogWindow>
      </div>
    </div>
  );
};

export default contact;
