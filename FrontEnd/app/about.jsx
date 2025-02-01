import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
// import DeveloperCard from './about';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Developer Data Array
const developersData = [
  {
    id: 1,
    name: "Shahriar Hossen Fahim",
    role: "Full Stack",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFj1BukuPb19w/profile-displayphoto-shrink_400_400/B4DZOHuDCUHgAo-/0/1733148817106?e=1743638400&v=beta&t=DRtxrOs_ntYCFw3HlUfJBAgHNOf36__eRPjnHLMnEdY",
    classRoll: "12",
    projectGroup: "DU_Slayers",
    
  },
  {
    id: 2,
    name: "Toha Hossain",
    role: "Full Stack ",
    image: "https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-1/462142344_515641454583594_6228464540860056862_n.jpg?stp=c0.100.1008.1008a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=t1HFHoeTWHUQ7kNvgHoj0-n&_nc_zt=24&_nc_ht=scontent.fdac24-5.fna&_nc_gid=ACeLhJJY8Zsvc7IeWoHrjs4&oh=00_AYAcmkW25Rbihmq3GmFkC6rnN4CkW9ImjbcuCfCdJ2ZRVA&oe=67A43CE8",
    classRoll: "30",
    projectGroup: "DU_Slayers",
    
  },
  {
    id: 3,
    name: "Md. Saif Mahmud",
    role: "FrontEnd",
    image: "https://scontent.fdac24-3.fna.fbcdn.net/v/t39.30808-6/356391750_775114980974416_5842311247918894615_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=izhx9egCw40Q7kNvgHD0CYG&_nc_zt=23&_nc_ht=scontent.fdac24-3.fna&_nc_gid=AxhD3o0K7wh2fyW9mI1cl86&oh=00_AYDOFp67VBjO_hN1yliOvn-HKNvk351LOfYFhLBMPzJycQ&oe=67A42DC8",
    classRoll: "34",
    projectGroup: "DU_Slayers",
    
  },
  {
    id: 4,
    name: "Md. Sajid Al Rafi",
    role: "FrontEnd",
    image: "https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-1/455162885_122164220450140704_4527833380780484003_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=k2ZhdHWrjlUQ7kNvgGDMqXo&_nc_zt=24&_nc_ht=scontent.fdac24-2.fna&_nc_gid=AA008zpctCgldlEUHiIEdSM&oh=00_AYC7zu-m8dKNJOfnqulgdR9ZhPCW380whXVI7a6FzkhpcQ&oe=67A440A5",
    classRoll: "62",
    projectGroup: "DU_Slayers",
    
  }
];


const DeveloperCard = ({ developer }) => {
    return (
      <View className="mx-2 mt-2 bg-white shadow shadow-gray-500 rounded-2xl overflow-hidden relative">
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute left-0 top-0 w-[8px] h-full"
        />
        {/* <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="absolute bottom-0 left-0 w-full h-[3px]"
        /> */}
        <View className="flex-row p-4">
          {/* Left side - Profile Image */}
          <View className="justify-center">
            <Image
              source={{ uri: developer.image }}
              className="w-20 h-20 rounded-full"
              style={{
                borderWidth: 3,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            />
          </View>
  
          {/* Right side - Information */}
          <View className="flex-1 ml-4">
            <View className="flex-row items-center justify-start">
              <Text className="text-lg font-bold text-gray-800">
                {developer.name}
              </Text>
            </View>
  
            <Text className="text-sm text-gray-500 mt-1">
              {developer.role}
            </Text>
  
            <View className="mt-3 flex-row items-center">
              <View className="bg-gray-100 px-3 py-1 rounded-full">
                <Text className="text-gray-600 text-xs">
                  Roll: {developer.classRoll}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  
const AboutUs = () => {
  return (
    <ScrollView className="flex-1 mt-10 bg-gray-100">
      {/* Header */}

      <View className="w-full px-4 py-2">
        <Text className="text-gray-800 text-2xl font-bold ">About Developers</Text>
      </View>

      {/* Developer Cards */}
      {developersData.map(developer => (
        <DeveloperCard key={developer.id} developer={developer} />
      ))}
    </ScrollView>
  );
};

export default AboutUs;
