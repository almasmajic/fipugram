<template>
    <div class="about">
        <h1>This is an login page</h1>
        <div class="container">
            <div class="row">
                <div class="col-sm"></div>
                <div class="col-sm">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input v-model="username" type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="button" @click="login()" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="col-sm"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { firebase } from "@/firebase";
export default {
    name: "login",
    data(){
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login(){
            console.log('login uspio' + this.username);
 
            firebase
            .auth()
            .signInWithEmailAndPassword(this.username, this.password)
            .then((result) => {
                console.log('Uspjesna prijava', result);

                this.$router.replace({ name: 'Home'});
            })
            .catch(function(e){
                console.error('Greška', e);
            });
        }
    }
}
</script>