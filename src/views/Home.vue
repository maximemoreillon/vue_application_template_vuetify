<template>
  <div class="home">
    <h1>Home</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis,
      beatae quibusdam ullam nam quam molestiae ut vitae. Ut, architecto.
      Consequuntur doloremque et fugit minus dolore tempore sit adipisci
      repellendus?
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    console.log("Home mounted")
    this.getProtectedData()
  },
  methods: {
    async getProtectedData() {
      const { data } = await this.axios.get(
        // "https://api.food.home.maximemoreillon.com/foods"
        "https://api.users.maximemoreillon.com/users/self"
      )
      console.log({ data })
    },
  },
}
</script>
