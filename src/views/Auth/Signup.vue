<template>
    <div class="about">
        <h1>This is an sign up page</h1>
        <div class="container">
            <div class="row">
                <div class="col-sm"></div>
                <div class="col-sm">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword2">Confirm password</label>
                            <input type="password" v-model="passwordConfirm" class="form-control" id="exampleInputPassword1" placeholder="Confirm password" />
                        </div>
                        <button type="button" @click="signup" class="btn btn-primary">Sign up</button>
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
        name: "Signup",
        data() {
            return {
                username: "",
                password: "",
                passwordConfirm: "",
            };
        },
        methods: {
            signup() {
                //ubaciti if koji provjerava slazu li se lozinke; ako ne, izbacuje alert
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.username, this.password)
                    .then(function () {
                        console.log("Registracija uspješna");
                    })
                    .catch(function (error) {
                        console.error("Došlo je do pogreške", error); //dodati alert da treba odabrati dulji password (min 6 znakova)
                    });
                console.log("Nastavak");
            },
        },
    };
</script>
