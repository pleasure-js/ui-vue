module.exports = {
  nuxtPleasure: {
    postCssVariables: {
      theme: {
        profile: {
          // todo: see if it can be reloaded
          background: `red`, // can be accessed via var(--theme-profile-background) in any postcss scope
        }
      }
    }
  }
}
