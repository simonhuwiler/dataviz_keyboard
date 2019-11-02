module.exports.getTemplate = function()
{
  return (
    `<html>
      <script>
        document.querySelector('#color').addEventListener("change", updateAll, false);
      </script>
      <body>
        <h1>Choose a Color and press a key</h1>
        <input type="color" id="color" name="head" value="#e66465">
      </body>
      </html>`
      
  )
}