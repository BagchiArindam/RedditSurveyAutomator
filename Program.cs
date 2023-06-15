using System;
using System.Media;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        string url = "http://old.reddit.com/user/AutoLovepon"; // Replace with the desired URL

        using (HttpClient client = new HttpClient())
        {
            while (true)
            {
                try
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

                    HttpResponseMessage response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode(); // Ensure a successful status code

                    string html = await response.Content.ReadAsStringAsync();
                    

                    // Check if the word "" is found
                    if (html.Contains(""))
                    {
                        // Play a sound
                        //SystemSounds.Asterisk.Play();
                        SystemSounds.Asterisk.Play();
                        Thread.Sleep(1000);
                        SystemSounds.Beep.Play();
                        Thread.Sleep(1000);
                        SystemSounds.Exclamation.Play();
                        Thread.Sleep(1000);
                        SystemSounds.Hand.Play();
                        Thread.Sleep(1000);
                        SystemSounds.Question.Play();
                    }
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                }

                await Task.Delay(TimeSpan.FromSeconds(10)); // Delay for 10 seconds
            }
        }
    }
}
