import { useEffect, useState } from "react";
import { getUser } from "../services/UserServices";

export default function UserAvatar() {
  const [fullname, setFullname] = useState<string>('');
  const [avatarNumber, setAvatarNumber] = useState<number>(() => {
    const storedAvatar = sessionStorage.getItem('userAvatarNumber');
    return storedAvatar ? parseInt(storedAvatar) : Math.floor(Math.random() * 5) + 1;
  });

  useEffect(() => {
    const fetchFullname = async () => {
      try {
        const currentUser = await getUser();
        const fullnameSeparate = currentUser.fullname.split(', ');
        setFullname(`${fullnameSeparate[0].split(' ')[0]} ${fullnameSeparate[1].split(' ')[0]}`);
        
        if (!sessionStorage.getItem('userAvatarNumber')) {
          const newAvatarNumber = Math.floor(Math.random() * 5) + 1;
          sessionStorage.setItem('userAvatarNumber', newAvatarNumber.toString());
          setAvatarNumber(newAvatarNumber);
        }
      } catch (error) {
        console.error('Error fetching fullname:', error);
      }
    };

    fetchFullname();
  }, []);
  
  return (
    <div className="flex items-center gap-2">
      <img 
        src={`/avatars/${avatarNumber}.png`}
        alt="User avatar"
        className="h-6 w-6 rounded-full object-cover"
      />
      <p className="text-sm">{ fullname }</p>
    </div>
  );
}