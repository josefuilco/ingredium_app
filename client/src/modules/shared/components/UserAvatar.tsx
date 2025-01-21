import { useEffect, useState } from "react";
import { getUser } from "../services/UserServices";

export default function UserAvatar() {
  const [fullname, setFullname] = useState<string>('');

  useEffect(() => {
    const fetchFullname = async () => {
      try {
        const currentUser = await getUser();
        const fullnameSeparate = currentUser.fullname.split(', ');
        setFullname(`${fullnameSeparate[0].split(' ')[0]} ${fullnameSeparate[1].split(' ')[0]}`);
      } catch (error) {
        console.error('Error fetching fullname:', error);
      }
    };

    fetchFullname();
  }, []);
  
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full h-6 w-6 bg-gray-500"></div>
      <p className="text-sm">{ fullname }</p>
    </div>
  );
}