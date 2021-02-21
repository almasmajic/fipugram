<template>
      <div class="row">
          
          <div class="col-8">
             <img v-if="loading" class="loading" :src = "require('@/assets/loading.gif')" />
            <form v-if="!loading" @submit.prevent="postNewImage" class="mb-5">
 <div class="form-group">
 <croppa :width="400" :height="400" placeholder="Učitaj sliku" v-model="imageReference"></croppa>
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
            <instagram-card v-for="card in filteredCards" :key="card.id" :info="card" />
          </div>
          <div class="col-4"></div>
      </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from '@/components/InstagramCard.vue';
import store from '@/store';
import {db,storage} from "@/firebase";

//... API/firebase -> sve kartice -> cards

/* cards = [
  {url: "https://picsum.photos/id/1/400/400", description: 'laptop', time: 'few minutes ago...'},
  {url: "https://picsum.photos/id/2/400/400", description: 'laptop #2', time: 'an hour ago...'},
  {url: "https://picsum.photos/id/3/400/400", description: 'laptop #3', time: 'two hours ago...'},
]; */



export default {
  name: 'Home',
  data: function(){
      return {
        loading: false,
        cards : [],
        store,
        newImageDescription: "",
        newImageUrl: "",
        imageReference: null, //referenca na sliku; nije string
    };
  },
  mounted(){
    this.getPosts();
  //dohvat iz Firebasea
  },
  methods:{
    getPosts(){
      console.log('Firebase dohvat...')

      db.collection("posts")
      .limit(10)
      .orderBy("posted_at", "desc")
      .get()
      .then((query) => { //query je instanca querySnapshota; then pisemo jer je promise
        this.cards = [] //isprazni kartice u slucaju visestrukog poziva getPosts() -> kako bi izbjegli gomilanje
        query.forEach((doc) => { //iterira kroz sve; potreban je callback
          const data = doc.data(); //nece se mijenjat vise

          this.cards.push({ //cards iz data returna
               id: data.id, //definiramo objekte koje smo prije imali rucno postavljeni
               time: data.posted_at,
               description: data.desc,
               url: data.url,
          }) 
        }) 
      })
    },
    getImage(){ //promise based, omotac oko callbacka

      return new Promise((resolveFn, errorFn)=> {
        this.imageReference.generateBlob(data => {
          resolveFn(data);
        })
      })
    },
    async postNewImage(){
      try{
        this.loading = true;
      //this.imageReference.generateBlob(blobData =>{
        let blobData = await this.getImage()
        let imageName = "posts/" + store.currentUser + "/" + Date.now() + ".png"
        let result = await storage.ref(imageName).put(blobData)
        let url = await result.ref.getDownloadURL();
        
            console.log('Javni link', url);

            const imageDescription = this.newImageDescription; //arrow function cuva this

            let doc = await db.collection("posts").add({
              url: url,
              desc: imageDescription,
              email: store.currentUser,
              posted_at: Date.now(),
            });
    
            console.log('Spremljeno', doc);
            alert("Slika je prenesena")
            this.newImageDescription = '';

            this.getPosts(); //iznova dohvaca nase postove i refresha
          } catch (e){
            console.error('Greska', e)
          }
          this.loading = false;
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

<style scoped>
  .loading {
    width: 60px
  }
</style>