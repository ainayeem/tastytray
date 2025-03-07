import UpdateProfileForm from "@/components/modules/auth/profile/UpdateProfileForm";
import { getMyProfile } from "@/services/AuthService";

const CustomerProfilePage = async () => {
  const { data: myProfile } = await getMyProfile();
  //   console.log("🚀 ~ CustomerProfilePage ~ myProfile:", myProfile);
  return (
    <div>
      <UpdateProfileForm myProfile={myProfile} />
    </div>
  );
};

export default CustomerProfilePage;
