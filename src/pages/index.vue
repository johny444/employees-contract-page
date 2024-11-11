<template>
  <div>
    <header>
      <Title>{{ $t("examinationSystem") }}</Title>
    </header>
    <div
      id="particles-js"
      class="normal_gradient d-flex justify-center align-center"
    >
      <v-card class="loginCard rounded-lg" align="center">
        <v-card-text>
          <div class="mt-4" style="text-align: center">
            <h1 class="text-secondary" style="font-size: 2.5rem">
              {{ $t("examinationSystem") }}
            </h1>
          </div>

          <div style="">
            <img src="@/assets/images/examLogo.png" :width="300" />
          </div>
          <div class="ml-4" style="min-width: 40%">
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="txtUseremail"
                :label="$t('email')"
                prepend-inner-icon="fas fa-user"
              ></v-text-field>
              <v-text-field
                v-model="txtPassword"
                :label="$t('password')"
                prepend-inner-icon="fas fa-unlock"
                :append-inner-icon="showPw ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="showPw ? 'text' : 'password'"
                @click:append-inner="showPw = !showPw"
              ></v-text-field>
              <v-row class="ma-0" justify="end">
                <v-btn
                  type="submit"
                  color="#1565C0"
                  prepend-icon="fas fa-right-to-bracket"
                  >{{ $t("login") }}
                </v-btn>
              </v-row>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { useLoadingStore } from "@/stores/loadingStore";
const loadingStore = useLoadingStore();
const { locale } = useI18n();
const storeUser = useUserStore();
const myForm = ref(null);
const router = useRouter();
const txtUseremail = ref("teacher2@gmail.com");
const txtPassword = ref("12345");

const showPw = ref(false);
const userlist = ref([]);
onMounted(() => {
  // locale.value = localStorage.getItem("i18n");
});
const onSubmit = async () => {
  // console.log("Count");
  const respone = await axios
    .post("http://localhost:8080/auth/login", {
      email: txtUseremail.value,
      password: txtPassword.value,
    })
    .catch((err) => {
      console.log("ERRO form login", err);
      // nuxtApp.$openDialog("E", "INVALID CREDENTIALS");
    });
  console.log("respone.data.message", respone.data);
  if (respone.data.token) {
    // console.log("we have token");
    await storeUser.acGetuserList(respone.data.token);
    storeUser.aclogIn();
    // console.log("user", storeUser.getuserList.user[0]);
    switch (storeUser.getuserList.user[0].role) {
      case "teacher":
        localStorage.setItem("token", respone.data.token);
        router.push("/dashboard");
        break;
      case "student":
        localStorage.setItem("token", respone.data.token);
        navigateTo(`/quiz`);
        break;

      default:
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  padding: 0px;
  overflow: hidden;
}
.normal_gradient {
  background: radial-gradient(circle, #35a2ff 0%, #28c2e5 100%);
  background-image: url(@/assets/images/background.jpg);
}
.loginCard {
  position: absolute;
  width: 25%;
  left: 10%;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
</style>


