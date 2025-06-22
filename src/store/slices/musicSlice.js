

import { createSlice } from '@reduxjs/toolkit';
import img2 from "../../assets/img2.jpg"
import img10 from "../../assets/img10.jpg"
import song4 from "../../assets/song4.mp3"
import song1 from "../../assets/song1.mp3"
import song2 from "../../assets/song2.mp3"
import song3 from "../../assets/song3.mp3"
import song5 from "../../assets/song5.mp3"
import song6 from "../../assets/song6.mp3"
import song7 from "../../assets/song7.mp3"
import song8 from "../../assets/song8.mp3"
import song9 from "../../assets/song9.mp3"
import song10 from "../../assets/song10.mp3"
import song11 from "../../assets/song11.mp3"

const initialState = {
  songs: [
    {
      id: 1,
      title: 'With You',
      artist: 'AP Dhillon',
      album: 'Hidden Gems',
      duration: 154,
      cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a1/68/16/a1681601-c5ed-2e57-0fcf-ce9a96582090/dj.efjjotdv.jpg/1200x1200bf-60.jpg',
      genre: 'Punjabi Pop',
      audioUrl: song11,
    },
    {
      id: 2,
      title: 'Levels',
      artist: 'Sidhu Moose Wala',
      album: 'Digital Age', // This album seems generic, consider if it's correct for Levels
      duration: 228,
      cover: 'https://i.scdn.co/image/ab67616d0000b2734f2f45995108e095ee3aec12',
      genre: 'Punjabi Hip Hop',
      audioUrl: song4,
    },
    {
      id: 3,
      title: 'Kesariya',
      artist: 'Pritam, Arijit Singh, Amitabh Bhattacharya',
      album: 'Brahmastra',
      duration: 270,
      cover: 'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg',
      genre: 'Bollywood Romantic',
      audioUrl: song8
    },
    {
      id: 4,
      title: 'Brown Munde',
      artist: 'AP Dhillon, Gurinder Gill, Shinda Kahlon',
      album: 'Brown Munde',
      duration: 205,
      cover: 'https://britasia.tv/wp-content/uploads/2020/09/Eh09An1VkAEohgB.jpg',
      genre: 'Punjabi Hip Hop',
      audioUrl: song5,
    },
    {
      id: 5,
      title: 'Malang',
      artist: 'Ved Sharma',
      album: 'Malang',
      duration: 280,
      cover: 'https://c.saavncdn.com/836/Malang-Unleash-The-Madness-Hindi-2020-20200619175502-500x500.jpg',
      genre: 'Bollywood Romantic',
      audioUrl: song7,
    },
    {
      id: 6,
      title: 'Excuses',
      artist: 'AP Dhillon, Gurinder Gill, Shinda Kahlon',
      album: 'Brown Munde',
      duration: 165,
      cover: 'https://i.scdn.co/image/ab67616d0000b2735b74e703d6ffb2ea16860c86',
      genre: 'Punjabi Hip Hop',
      audioUrl: song6,
    },
    {
      id: 7,
      title: 'Tere Bin Nahi Laage',
      artist: 'Uzair Jaswal',
      album: 'Ek Paheli Leela',
      duration: 302,
      cover: 'https://tse4.mm.bing.net/th?id=OIP.tWqs1KjwrD28crTFDlWGkAHaKt&pid=Api&P=0&h=180',
      genre: 'Bollywood Romantic', // Changed from 'Jazz' based on song context
      audioUrl: song9,
    },
    {
      id: 8,
      title: 'Dil Bechara',
      artist: 'A.R. Rahman, Shreya Ghoshal',
      album: 'Dil Bechara',
      duration: 260,
      cover: 'https://assets.gadgets360cdn.com/pricee/assets/product/202304/dil_bechara_1_1682232883.jpg',
      genre: 'Bollywood Sad',
      audioUrl: song10,
    },
    {
      id: 9,
      title: 'Channa Mereya',
      artist: 'Arijit Singh, Pritam',
      album: 'Ae Dil Hai Mushkil',
      duration: 285,
      cover: 'https://c.saavncdn.com/103/Channa-Mereya-From-Ae-Dil-Hai-Mushkil-Hindi-2016-500x500.jpg', // Updated cover URL
      genre: 'Bollywood Romantic',
      audioUrl: song3, // Placeholder audio, as discussed
    },
    {
      id: 10,
      title: 'Ghungroo',
      artist: 'Vishal & Shekhar, Arijit Singh, Shilpa Rao',
      album: 'War',
      duration: 285,
      cover: 'https://media2.bollywoodhungama.in/wp-content/uploads/2019/09/War-Ghungroo-Song-Hrithik-Roshan-Vaani-Kapoor.jpg', // Updated cover URL
      genre: 'Bollywood Dance',
      audioUrl: song2,
    },
    {
      id: 11,
      title: 'Obsessed',
      artist: 'Riar Saab, Abhijay Sharma',
      album: 'Single - Obsessed', // More specific album name for single
      duration: 160,
      cover: img2, // Updated cover URL
      genre: 'Punjabi Pop',
      audioUrl: song1,
    },
    {
      id: 12,
      title: 'Lamberghini',
      artist: 'The Doorbeen Feat. Ragini Tandon',
      album: 'Single - Lamberghini', // More specific album name for single
      duration: 190,
      cover: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuQrRykjwNGcn6bIMzWUwAXitOFMN8UEdaLV3RkAvINz6JaJzmJ7-bXgm3TG9xhDHWgLchcHyo4UdqKcJb3UJeBA7yPgEySeMP8Ekm9qTI-Go20F9xO8EJVG38_3bvpaZn6tmH_p06uTQ/w1200-h630-p-k-no-nu/Lyrics+-+Lamborghini+Chalayi+-+%25E0%25A4%25B2%25E0%25A5%2587%25E0%25A4%25AE%25E0%25A5%258D%25E0%25A4%25AC%25E0%25A5%258B%25E0%25A4%25B0%25E0%25A5%258D%25E0%25A4%2597%25E0%25A4%25BF%25E0%25A4%25A8%25E0%25A5%2580+%25E0%25A4%259A%25E0%25A4%25B2%25E0%25A4%25BE%25E0%25A4%25AF%25E0%25A5%2580+-+The+Doorben.jpg', // Updated cover URL
      genre: 'Punjabi Pop',
      audioUrl: song8,
    },
    {
      id: 13,
      title: 'Kala Chashma',
      artist: 'Badshah, Neha Kakkar, Indeep Bakshi',
      album: 'Baar Baar Dekho',
      duration: 195,
      cover: 'https://i.ytimg.com/vi/nIappv5kWc0/maxresdefault.jpg', // Updated cover URL
      genre: 'Bollywood Dance',
      audioUrl: song6,
    },
    {
      id: 14,
      title: 'Bijlee Bijlee',
      artist: 'Harrdy Sandhu',
      album: 'Single - Bijlee Bijlee', // More specific album name for single
      duration: 180,
      cover: 'https://m.media-amazon.com/images/M/MV5BMWIxYTZmNWItYzVlNy00YmM4LWE4MmItMzI2ZTFhZDE2YWE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', // Updated cover URL
      genre: 'Punjabi Pop',
      audioUrl: song11,
    },
    {
      id: 15,
      title: 'Pasoori',
      artist: 'Ali Sethi, Shae Gill',
      album: 'Coke Studio Season 14',
      duration: 335,
      cover: 'https://starsunfolded.com/wp-content/uploads/2022/06/Pasoori-song-poster.jpg', // Updated cover URL
      genre: 'Punjabi Fusion',
      audioUrl: song5,
    },
    {
      id: 16,
      title: 'Tera Yaar Hoon Main',
      artist: 'Arijit Singh, Rochak Kohli',
      album: 'Sonu Ke Titu Ki Sweety',
      duration: 260,
      cover: 'https://m.media-amazon.com/images/M/MV5BYTYxNGE5MTgtN2YxYS00ODYyLWE1YzQtYzNlMzAyMTBlMWZhXkEyXkFqcGdeQXVyMzcwOTk0MzU@._V1_FMjpg_UX1000_.jpg', // Updated cover URL
      genre: 'Bollywood Friendship',
      audioUrl: song3,
    },
    {
      id: 17,
      title: 'Jai Jai Shivshankar',
      artist: 'Vishal & Shekhar, Benny Dayal, Neeti Mohan',
      album: 'War',
      duration: 210,
      cover: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/09/war-jaijaishivshankar-1569038358.jpg', // Updated cover URL
      genre: 'Bollywood Dance',
      audioUrl: song4,
    },
  ],
  albums: [
    {
  id: 1,
  title: 'Trending India',
  artist: 'Various Artists', // Assuming it's a compilation, 'Various Artists' is suitable
  cover: img10, // Keeping your local image import
  songs: [], // You'll need to populate this array with song IDs that belong to this "Trending India" playlist/album
  genre: 'Mixed/Compilation', // Or a more specific genre if known, like 'Bollywood Pop' etc.
  year: new Date().getFullYear(), // Assuming it's a current trending list, setting current year
},
 
    {
      id: 2,
      title: 'Moosetape', 
      artist: 'Sidhu Moose Wala',
      cover: 'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/e4/3f/2b/e43f2b5c-2771-5987-1c05-f8d0ed8a86fa/1774.jpg/1200x1200bf-60.jpg',
      songs: [2],
      genre: 'Punjabi Hip Hop',
      year: 2022, // Assuming year for Levels
    },
    {
      id: 3,
      title: 'Brahmastra',
      artist: 'Pritam',
      cover: 'https://assets.gadgets360cdn.com/pricee/assets/product/202204/brahmastra_poster_1649657296.jpeg',
      songs: [3],
      genre: 'Bollywood Romantic',
      year: 2022,
    },
    {
      id: 4,
      title: 'Brown Munde',
      artist: 'AP Dhillon',
      cover: 'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/67/37/31/67373108-1018-da3f-7220-4515137e5e5e/859766525070_cover.jpg/1200x1200bf-60.jpg',
      songs: [1,4, 6],
      genre: 'Punjabi Hip Hop',
      year: 2020,
    },

    {
      id: 5,
      title: 'War',
      artist: 'Vishal-Shekhar',
      cover: 'https://static.rogerebert.com/uploads/movie/movie_poster/war-2019/large_war-poster.jpg',
      songs: [10, 17], // Added Jai Jai Shivshankar (id: 17)
      genre: 'Bollywood Dance',
      year: 2019,
    },
  
   
   
  ],
  genres: ['All', 'Punjabi Pop', 'Punjabi Hip Hop', 'Bollywood Romantic', 'Bollywood Sad', 'Bollywood Dance', 'Bollywood Friendship', 'Pakistani Fusion', 'Bollywood'],
  searchResults: [],
  currentGenre: 'All',
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setCurrentGenre: (state, action) => {
      state.currentGenre = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
});

export const { setSearchResults, setCurrentGenre, clearSearch } = musicSlice.actions;

export default musicSlice.reducer;