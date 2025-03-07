import UpdateMealProviderProfileForm from "@/components/modules/auth/profile/UpdateMealProviderProfileForm";
import { getMyProfile } from "@/services/AuthService";

const MealProviderProfilePage = async () => {
  const { data: myProfile } = await getMyProfile();
  // console.log("🚀 ~ MealProviderProfilePage ~ myProfile:", myProfile);
  return (
    <div>
      <UpdateMealProviderProfileForm myProfile={myProfile} />
    </div>
  );
};

export default MealProviderProfilePage;
