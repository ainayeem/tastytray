import UpdateProfileForm from "@/components/modules/auth/profile/UpdateProfileForm";

const CustomerProfilePage = async () => {
  // const myProfile = (await getMyProfile()).data;
  //   console.log("🚀 ~ CustomerProfilePage ~ myProfile:", myProfile);
  return (
    <div>
      <UpdateProfileForm
      // myProfile={myProfile}
      />
    </div>
  );
};

export default CustomerProfilePage;
