/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 16:13:29
 * @LastEditTime: 2022-07-11 15:20:40
 * @LastEditors: wsy
 */
module.exports = {
  theme: {
    container: false,
    extend: {
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(0, 1fr))'
      },
      gridTemplateRows: {
        auto: 'repeat(auto-fill, minmax(0, 1fr))'
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px'
      }
    }
  },

  plugins: [require('@tailwindcss/line-clamp')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}
