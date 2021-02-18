<template>
      <div class="row">
          
          <div class="col-8">
            <form @submit.prevent="postNewImage" class="form-inline mb-5">
 <div class="form-group">
 <label for="imageUrl">Image URL</label>
 <input
 v-model="newImageUrl"
type="text"
class="form-control ml-2"
placeholder="Enter the image URL"
id="imageUrl"
 />
 </div>
 <div class="form-group">
 <label for="imageDescription">Description</label>
 <input
 v-model="newImageDescription"
type="text"
class="form-control ml-2"
placeholder="Enter the image description"
id="imageDescription"
 />
 </div>
 <button type="submit" class="btn btn-primary ml-2">Post
image</button>
 </form>
            <instagram-card v-for="card in filteredCards" :key="card.url" :info="card" />
          </div>
          <div class="col-4"></div>
      </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from '@/components/InstagramCard.vue';
import store from '@/store';
import {db} from "@/firebase";

let cards = [];

//... API/firebase -> sve kartice -> cards

cards = [
  {url: "https://picsum.photos/id/1/400/400", description: 'laptop', time: 'few minutes ago...'},
  {url: "https://picsum.photos/id/2/400/400", description: 'laptop #2', time: 'an hour ago...'},
  {url: "https://picsum.photos/id/3/400/400", description: 'laptop #3', time: 'two hours ago...'},
];



export default {
  name: 'Home',
  data: function(){
      return {
        cards,
        store,
        newImageDescription: "",
        newImageUrl: ""
    };
  },
  methods:{
    postNewImage(){
      const imageUrl = this.newImageUrl; 
      const imageDescription = this.newImageDescription;

      db.collection("posts").add({
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
      })
      .then((doc)=> { 
        console.log('Spremljeno', doc);
        this.newImageDescription = "";
        this.newImageUrl = "";
        alert("Slika je prenesena") //dodaj obavijest koja ce korisniku rec da je slika uspjesno prenesena
      })
      .catch((e) => { 
        console.error(e);
        alert.error("Doslo je do pogreske, slika nije ucitana")
      })
    }
  },
  computed: {
    filteredCards(){
      //logika koja filtrira cards
      let termin=this.store.searchTerm;

      return this.cards.filter((card) => card.description.includes(termin)); //isto kao return this.cards.filter (card => card.description.indexOf(termin) >= 0);
  },
},
  components: {
    InstagramCard,
  },
};
</script>