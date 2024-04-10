import DialogWindow from "../Components/dialogWindow";
import DialogChoose from "../Components/dialogChoose";
import "./familyContact.scss"


const contacts = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: 2,
        name: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: 4,
        name: 'Sarah Davis',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: 5,
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
];
const contact = () => {
    return (
        <div className="contact">
            <div className={"contact-left"}>
                <DialogChoose contacts={ contacts }></DialogChoose>
            </div>
            <div className={"contact-main"}>
                <DialogWindow></DialogWindow>
            </div>
        </div>
    );
}

export default contact;
