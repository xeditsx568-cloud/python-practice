"use strict";

const KEY = "jarvisBuilder.v1";

function lines(list) {
  return list.join("\n");
}

const STEPS = [
  {
    id: "create",
    minutes: 3,
    section: "Start",
    title: "Create jarvis.py",
    building: "A new file Python can run. main.py stays as it is.",
    actions: [
      "In Cursor, open the MyAIAssistant folder.",
      "Create a file named jarvis.py. Do not edit main.py.",
      "Paste the line below into jarvis.py.",
      "Open the terminal in Cursor and run the command."
    ],
    snippets: [{ name: "jarvis.py", code: "print(\"JARVIS file is ready.\")" }],
    where: "This is the whole file for now.",
    run: "python jarvis.py",
    success: "JARVIS file is ready.",
    why: "print sends text to the terminal. This page cannot run Python. Cursor on your computer does.",
    help: [
      "If Python cannot find the file, the terminal is in the wrong folder. It should be MyAIAssistant.",
      "If python is not recognized, run py jarvis.py instead."
    ]
  },
  {
    id: "greet",
    minutes: 3,
    section: "Start",
    title: "Say hello",
    building: "JARVIS greets you when the file starts.",
    actions: [
      "Replace the line in jarvis.py with the line below.",
      "Save the file.",
      "Run it again."
    ],
    snippets: [{ name: "Replace the old line", code: "print(\"JARVIS: Hello. I am online.\")" }],
    where: "Replace the line from the last step. Do not add a second print.",
    run: "python jarvis.py",
    success: "JARVIS: Hello. I am online.",
    why: "The words inside the quotes are the message. The quotes do not appear on screen.",
    help: [
      "If you still see JARVIS file is ready, the old line is still in the file, or the file was not saved."
    ]
  },
  {
    id: "input",
    minutes: 4,
    section: "Commands",
    title: "Read a line",
    building: "JARVIS waits for you to type, then repeats what you typed.",
    actions: [
      "Make jarvis.py match the file below.",
      "Run it, type test, and press Enter."
    ],
    snippets: [{
      name: "jarvis.py",
      code: lines([
        "print(\"JARVIS: Hello. I am online.\")",
        "command = input(\"You: \")",
        "print(\"JARVIS: You said\", command)"
      ])
    }],
    where: "This replaces the whole file. It is still only three lines.",
    run: "python jarvis.py",
    success: lines([
      "JARVIS: Hello. I am online.",
      "You: test",
      "JARVIS: You said test"
    ]),
    why: "input waits for Enter, then stores the line in command. The comma in print puts one space before what you typed.",
    parts: [
      "You: is the prompt. It is shown before you type.",
      "command is the name of the stored line."
    ],
    help: [
      "After You: the program is waiting, not frozen. Type something and press Enter."
    ]
  },
  {
    id: "commands",
    minutes: 5,
    section: "Commands",
    title: "Answer hello",
    building: "JARVIS chooses a reply instead of repeating every line.",
    actions: [
      "Replace the file with the version below.",
      "Run it and type hello.",
      "Run it again and type HELP.",
      "Run it again and type status."
    ],
    snippets: [{
      name: "jarvis.py",
      code: lines([
        "print(\"JARVIS: Hello. I am online.\")",
        "command = input(\"You: \").strip()",
        "",
        "if command.lower() == \"hello\":",
        "    print(\"JARVIS: At your service.\")",
        "elif command.lower() == \"help\":",
        "    print(\"JARVIS: Try hello, help, or exit.\")",
        "else:",
        "    print(\"JARVIS: I heard you.\")"
      ])
    }],
    where: "This replaces the whole file. The print lines under if, elif, and else each start with four spaces.",
    run: "python jarvis.py",
    success: lines([
      "hello  ->  JARVIS: At your service.",
      "HELP   ->  JARVIS: Try hello, help, or exit.",
      "status ->  JARVIS: I heard you."
    ]),
    why: "if runs one indented block only when the test is true. elif tries the next test. else runs when none of the tests matched.",
    parts: [
      ".strip() removes a space you typed by accident.",
      ".lower() makes Hello and HELLO match hello.",
      "== compares two values. One = would store a value instead."
    ],
    help: [
      "IndentationError means a print line is not indented with four spaces.",
      "If HELP takes the else branch, .lower() is missing."
    ]
  },
  {
    id: "loop",
    minutes: 6,
    section: "Commands",
    title: "Loop until exit",
    building: "JARVIS keeps asking until you type exit.",
    actions: [
      "Replace the file with the loop below.",
      "Run it once.",
      "Type hello, then help, then exit."
    ],
    snippets: [{
      name: "jarvis.py",
      code: lines([
        "print(\"JARVIS: Hello. I am online.\")",
        "",
        "while True:",
        "    command = input(\"You: \").strip()",
        "    if command.lower() == \"exit\":",
        "        print(\"JARVIS: Goodbye.\")",
        "        break",
        "    if command == \"\":",
        "        continue",
        "    if command.lower() == \"hello\":",
        "        print(\"JARVIS: At your service.\")",
        "    elif command.lower() == \"help\":",
        "        print(\"JARVIS: Try hello, help, or exit.\")",
        "    else:",
        "        print(\"JARVIS: I heard you.\")"
      ])
    }],
    where: "This replaces the whole file. Lines inside the loop are indented. Lines inside a test are indented again.",
    run: "python jarvis.py",
    success: lines([
      "JARVIS: Hello. I am online.",
      "You: hello",
      "JARVIS: At your service.",
      "You: help",
      "JARVIS: Try hello, help, or exit.",
      "You: exit",
      "JARVIS: Goodbye."
    ]),
    why: "while True repeats forever. break is the line that leaves the loop. continue skips the rest of this pass and asks again.",
    parts: [
      "An empty line is ignored, so a stray Enter does not get a reply.",
      "Without break, exit would print goodbye and then ask again."
    ],
    help: [
      "If the program never ends, exit is not reaching break. Check the spelling and the indent of break.",
      "To stop a stuck program, click the terminal and press Ctrl+C."
    ]
  },
  {
    id: "function",
    minutes: 6,
    section: "Commands",
    title: "Use a function",
    building: "The same replies, moved into reply so later commands have one home.",
    actions: [
      "Replace the file with the version below.",
      "Run the same test: hello, help, exit.",
      "The replies should not change. That means the move worked."
    ],
    snippets: [{
      name: "jarvis.py",
      code: lines([
        "def reply(command):",
        "    if command.lower() == \"hello\":",
        "        return \"At your service.\"",
        "    if command.lower() == \"help\":",
        "        return \"Try hello, help, or exit.\"",
        "    return \"I heard you.\"",
        "",
        "print(\"JARVIS: Hello. I am online.\")",
        "",
        "while True:",
        "    command = input(\"You: \").strip()",
        "    if command.lower() == \"exit\":",
        "        print(\"JARVIS: Goodbye.\")",
        "        break",
        "    if command == \"\":",
        "        continue",
        "    print(\"JARVIS:\", reply(command))"
      ])
    }],
    where: "This replaces the whole file. This is the basic assistant. Every later step adds to this file.",
    run: "python jarvis.py",
    success: lines([
      "You: hello",
      "JARVIS: At your service.",
      "You: exit",
      "JARVIS: Goodbye."
    ]),
    why: "def names a function. return sends text back to the loop. The loop prints it. New commands can go inside reply without rewriting the loop.",
    parts: [
      "reply(command) is the call. command is the line you just typed.",
      "The last return is the backup reply."
    ],
    help: [
      "If you see the word None, a branch is missing return.",
      "The greeting should still appear before the first You:."
    ]
  },
  {
    id: "allow",
    minutes: 6,
    section: "Windows",
    title: "Allow two apps",
    building: "A whitelist that can start Notepad or Calculator, and nothing else.",
    actions: [
      "Add the import as the first line of jarvis.py.",
      "Paste the whitelist and open_app under the reply function.",
      "Do not change the loop yet.",
      "Run hello and exit again. The old replies should still work."
    ],
    snippets: [
      { name: "First line of the file", code: "import subprocess" },
      {
        name: "Under reply",
        code: lines([
          "ALLOWED = {",
          "    \"notepad\": [\"notepad.exe\"],",
          "    \"calc\": [\"calc.exe\"],",
          "}",
          "",
          "def open_app(name):",
          "    if name not in ALLOWED:",
          "        return \"That app is not allowed.\"",
          "    subprocess.Popen(ALLOWED[name])",
          "    return \"Opening \" + name"
        ])
      }
    ],
    where: "import goes at the top. ALLOWED and open_app go after reply and before the greeting. Leave the loop alone.",
    run: "python jarvis.py",
    success: "hello still answers, and exit still ends the program. No app opens yet.",
    why: "subprocess is the tool that starts another program. The list [\"notepad.exe\"] is the program to start. A typed sentence is never sent to Windows.",
    parts: [
      "ALLOWED is the only names JARVIS may open.",
      "Popen starts that program. shell=True is not used.",
      "notepad.exe and calc.exe are the real Windows program names."
    ],
    help: [
      "A red error about subprocess means the import line is missing or not at the top.",
      "Do not add os.system or shell=True. Those can run more than the one program you named."
    ]
  },
  {
    id: "open",
    minutes: 5,
    section: "Windows",
    title: "Open an app",
    building: "The command open notepad or open calc.",
    actions: [
      "Replace the whole reply function with the one below. Keep open_app.",
      "Run JARVIS.",
      "Type open calc, then open cmd, then exit."
    ],
    snippets: [{
      name: "Replace reply",
      code: lines([
        "def reply(command):",
        "    parts = command.lower().split()",
        "    if parts and parts[0] == \"open\":",
        "        if len(parts) == 1:",
        "            return \"Say open notepad or open calc.\"",
        "        return open_app(parts[1])",
        "    if command.lower() == \"hello\":",
        "        return \"At your service.\"",
        "    if command.lower() == \"help\":",
        "        return \"Try hello, help, open notepad, open calc, or exit.\"",
        "    return \"I heard you.\""
      ])
    }],
    where: "Replace only def reply. Do not remove open_app, the loop, or the import.",
    run: "python jarvis.py",
    success: lines([
      "You: open calc",
      "JARVIS: Opening calc",
      "You: open cmd",
      "JARVIS: That app is not allowed.",
      "You: exit",
      "JARVIS: Goodbye."
    ]),
    why: "split breaks the line into words. The first word chooses the command. The second word is the app name. cmd is not in the whitelist, so it is refused.",
    parts: [
      "Calculator should open for open calc. Close it yourself when you are done.",
      "open notepad does the same for Notepad.",
      "The refusal rule was checked. This tutorial did not launch the apps for you."
    ],
    help: [
      "If open calc prints Opening calc but no window appears, look at the taskbar. Calculator may already be open.",
      "If every open command is refused, the name must be notepad or calc, not notepad.exe."
    ]
  },
  {
    id: "ollama-check",
    minutes: 3,
    section: "Local model",
    title: "Check Ollama",
    building: "Proof that the local model is available before JARVIS calls it.",
    actions: [
      "Leave jarvis.py unchanged.",
      "In the Cursor terminal, run ollama list.",
      "Find qwen3:8b in that list."
    ],
    snippets: [],
    where: "No code change in this step.",
    run: "ollama list",
    success: "A line that starts with qwen3:8b.",
    why: "The model runs on this computer through Ollama. The phone you are reading cannot reach it. qwen3:8b is the model already used by main.py, and ollama list on this computer showed it.",
    help: [
      "If the command is not recognized, open the Ollama app from the Start menu, wait until it is running, and try again.",
      "If qwen3:8b is missing, run ollama pull qwen3:8b and wait for the download."
    ]
  },
  {
    id: "ask-once",
    minutes: 7,
    section: "Local model",
    title: "Ask the model once",
    building: "One real reply from qwen3:8b, then back to the normal loop.",
    actions: [
      "Add import ollama under import subprocess.",
      "Add MODEL and the ask_model function below.",
      "Put the test print just above the greeting.",
      "Run the file once. Wait for a sentence.",
      "Delete only the test print. Leave ask_model in the file."
    ],
    snippets: [
      { name: "With the other import", code: "import ollama" },
      {
        name: "Above the greeting",
        code: lines([
          "MODEL = \"qwen3:8b\"",
          "",
          "def ask_model(command):",
          "    response = ollama.chat(",
          "        model=MODEL,",
          "        messages=[",
          "            {",
          "                \"role\": \"system\",",
          "                \"content\": \"You are JARVIS, a helpful assistant. Answer clearly and briefly.\",",
          "            },",
          "            {\"role\": \"user\", \"content\": command},",
          "        ],",
          "        think=False,",
          "    )",
          "    return response[\"message\"][\"content\"]"
        ])
      },
      {
        name: "Temporary test, delete after one run",
        code: "print(ask_model(\"Reply with one short sentence.\"))"
      }
    ],
    where: "MODEL and ask_model go above the greeting. The test print goes on the line directly above print(\"JARVIS: Hello. I am online.\"). Delete that test print after it works.",
    run: "python jarvis.py",
    success: "A short sentence from the model, then JARVIS: Hello. I am online. The exact sentence will change. Then the usual You: prompt appears.",
    why: "ollama.chat sends the messages list to qwen3:8b on this computer. think=False asks for the answer only. That call was checked here: the text comes back at response[\"message\"][\"content\"].",
    parts: [
      "system tells the model how to behave.",
      "user is the question.",
      "This version sends only the current question. It does not remember the last one yet."
    ],
    help: [
      "If it sits there with no output, start the Ollama app and run it again. The first reply can take a little while.",
      "If Python says there is no attribute think, delete the think=False line and the comma before it.",
      "A blank answer usually means think=False was left out. qwen3 can hide its answer in reasoning without that setting."
    ]
  },
  {
    id: "unknown",
    minutes: 6,
    section: "Local model",
    title: "Answer unknown commands",
    building: "hello and open stay local. Anything else goes to the model.",
    actions: [
      "In reply, replace the last line return \"I heard you.\" with return None.",
      "Inside the loop, replace the print of reply(command) with the four lines below.",
      "Run it. Type hello, then ask what a variable is, then exit."
    ],
    snippets: [
      { name: "Last line of reply", code: "    return None" },
      {
        name: "Inside the loop, in place of the old print",
        code: lines([
          "        answer = reply(command)",
          "        if answer is None:",
          "            answer = ask_model(command)",
          "        print(\"JARVIS:\", answer)"
        ])
      }
    ],
    where: "return None stays indented inside reply. The four loop lines stay indented inside while, at the same level as the exit test.",
    run: "python jarvis.py",
    success: lines([
      "You: hello",
      "JARVIS: At your service.",
      "You: what is a variable?",
      "JARVIS: a short answer from the model",
      "You: exit",
      "JARVIS: Goodbye."
    ]),
    why: "None means reply has no local answer. The loop then calls ask_model. hello and open never reach the model.",
    help: [
      "If you see the word None, the loop is still using the old print(\"JARVIS:\", reply(command)) line.",
      "If hello starts a long model answer, return None replaced the hello return by mistake. None belongs only on the last line."
    ]
  },
  {
    id: "history",
    minutes: 5,
    section: "Local model",
    title: "Remember this run",
    building: "The model can use earlier turns from this same run.",
    actions: [
      "Add the messages list next to MODEL.",
      "Replace ask_model with the version below.",
      "Run JARVIS and ask two related questions before exit.",
      "A good pair: My name is Alex. Then: What is my name?"
    ],
    snippets: [
      {
        name: "Next to MODEL",
        code: lines([
          "messages = [",
          "    {",
          "        \"role\": \"system\",",
          "        \"content\": \"You are JARVIS, a helpful assistant. Answer clearly and briefly.\",",
          "    }",
          "]"
        ])
      },
      {
        name: "Replace ask_model",
        code: lines([
          "def ask_model(command):",
          "    messages.append({\"role\": \"user\", \"content\": command})",
          "    response = ollama.chat(model=MODEL, messages=messages, think=False)",
          "    answer = response[\"message\"][\"content\"]",
          "    messages.append({\"role\": \"assistant\", \"content\": answer})",
          "    return answer"
        ])
      }
    ],
    where: "messages is created once, above the functions. ask_model now uses that same list instead of building a new one each call.",
    run: "python jarvis.py",
    success: "The second answer can use the first. If you said your name, the model should be able to repeat it. Closing the program still forgets, until the next step.",
    why: "Ollama does not keep your chat after the call ends. The messages list is the memory. append adds the question, then the answer, so the next call sends both.",
    help: [
      "If the second answer ignores the first, ask_model may still contain the old messages=[...] list. Replace the whole function.",
      "hello and open are not added to this list. Only questions that reach ask_model are."
    ]
  },
  {
    id: "save",
    minutes: 5,
    section: "Memory",
    title: "Save memory.json",
    building: "The conversation is written to a file before JARVIS exits.",
    actions: [
      "Add import json next to the other imports.",
      "Add save_memory under ask_model.",
      "Call save_memory just before return answer inside ask_model.",
      "Call save_memory in the exit branch, just before break.",
      "Have a short chat, type exit, then open memory.json."
    ],
    snippets: [
      { name: "With the other imports", code: "import json" },
      {
        name: "New function",
        code: lines([
          "def save_memory():",
          "    with open(\"memory.json\", \"w\", encoding=\"utf-8\") as file:",
          "        json.dump(messages, file)"
        ])
      },
      { name: "Last lines of ask_model", code: lines(["    save_memory()", "    return answer"]) },
      {
        name: "Exit branch",
        code: lines([
          "        print(\"JARVIS: Goodbye.\")",
          "        save_memory()",
          "        break"
        ])
      }
    ],
    where: "save_memory can sit under ask_model. The call inside ask_model goes immediately above return answer. The exit call goes immediately above break.",
    run: "python jarvis.py",
    success: "After exit, memory.json is in the same folder. It contains the system message and the questions you asked the model.",
    why: "json.dump writes the list in a form Python can read back. \"w\" replaces the file each time, so it stays a copy of the current list. encoding=\"utf-8\" keeps normal written text intact.",
    help: [
      "If memory.json is missing, exit never reached save_memory, or the file was saved in another folder. Check the terminal's folder.",
      "Local commands such as hello may be absent from the file. Only model turns and the exit save are included."
    ]
  },
  {
    id: "load",
    minutes: 5,
    section: "Memory",
    title: "Load memory next time",
    building: "JARVIS reads memory.json when it starts.",
    actions: [
      "Add load_memory under save_memory.",
      "Call load_memory() on the line before the greeting.",
      "Run JARVIS and ask what you talked about last time.",
      "Type exit when you are done."
    ],
    snippets: [
      {
        name: "New function",
        code: lines([
          "def load_memory():",
          "    global messages",
          "    try:",
          "        with open(\"memory.json\", encoding=\"utf-8\") as file:",
          "            loaded = json.load(file)",
          "    except (FileNotFoundError, json.JSONDecodeError):",
          "        return",
          "    if isinstance(loaded, list) and loaded:",
          "        messages = loaded"
        ])
      },
      {
        name: "Just before the greeting",
        code: lines([
          "load_memory()",
          "print(\"JARVIS: Hello. I am online.\")"
        ])
      }
    ],
    where: "load_memory goes under save_memory. The call goes immediately above the greeting, still outside the loop.",
    run: "python jarvis.py",
    success: "A question about the previous run can use that earlier chat. If memory.json does not exist yet, JARVIS still starts normally.",
    why: "global messages lets load_memory replace the list the rest of the file uses. A missing or broken file is ignored, so a bad save cannot stop the assistant from starting.",
    help: [
      "If the old chat is ignored, load_memory() is not being called, or it is indented inside the loop by mistake.",
      "Delete memory.json if you want a fresh conversation. JARVIS will start with the system message again."
    ]
  },
  {
    id: "speak",
    minutes: 6,
    section: "Voice",
    title: "Speak the reply",
    optional: true,
    building: "JARVIS reads the reply aloud. The text still prints if speech is unavailable.",
    actions: [
      "In the terminal, run pip install pyttsx3.",
      "Add the say function below.",
      "Where the loop prints the answer, call say(answer) instead.",
      "Run JARVIS and type hello."
    ],
    snippets: [
      { name: "Terminal, once", code: "pip install pyttsx3" },
      {
        name: "New function",
        code: lines([
          "def say(text):",
          "    print(\"JARVIS:\", text)",
          "    try:",
          "        import pyttsx3",
          "        engine = pyttsx3.init()",
          "        engine.say(text)",
          "        engine.runAndWait()",
          "    except Exception:",
          "        return"
        ])
      },
      { name: "In the loop, replace the answer print", code: "    say(answer)" }
    ],
    where: "say can go under load_memory. Replace only the line print(\"JARVIS:\", answer). Leave the goodbye print as it is.",
    run: "python jarvis.py",
    success: "You still see JARVIS: At your service. If pyttsx3 installed, you should also hear it. Speech was not run while this tutorial was written.",
    why: "pyttsx3 uses the Windows voice already on the computer. say prints first, then tries speech. If the install or the audio device fails, the text reply remains.",
    help: [
      "This step is optional. If pip fails, skip it. Later steps still work with print.",
      "The first spoken line can pause for a moment while the voice engine starts.",
      "pyttsx3 was not installed in the check for this tutorial, so hearing the voice is for you to confirm."
    ]
  },
  {
    id: "listen",
    minutes: 6,
    section: "Voice",
    title: "Listen with the mic",
    optional: true,
    building: "A listen function that uses the microphone when it can, and the keyboard when it cannot.",
    actions: [
      "Try the two install commands. If either fails, skip this step.",
      "Add listen under say.",
      "In the loop, replace input(\"You: \").strip() with listen().",
      "Run JARVIS. Speak after Listening, or type if it asks you to."
    ],
    snippets: [
      { name: "Terminal", code: lines(["pip install SpeechRecognition", "pip install pyaudio"]) },
      {
        name: "New function",
        code: lines([
          "def listen():",
          "    try:",
          "        import speech_recognition as sr",
          "    except ImportError:",
          "        return input(\"You: \").strip()",
          "    recognizer = sr.Recognizer()",
          "    try:",
          "        with sr.Microphone() as source:",
          "            print(\"JARVIS: Listening...\")",
          "            audio = recognizer.listen(source, timeout=5, phrase_time_limit=8)",
          "        heard = recognizer.recognize_google(audio)",
          "        print(\"You:\", heard)",
          "        return heard",
          "    except Exception:",
          "        print(\"JARVIS: I could not hear that. Type instead.\")",
          "        return input(\"You: \").strip()"
        ])
      },
      { name: "First line inside the loop", code: "    command = listen()" }
    ],
    where: "Replace only the input line inside the loop. Everything after it still uses command.",
    run: "python jarvis.py",
    success: "Either JARVIS: Listening... and then your words, or the normal You: prompt. The microphone path was not run for this tutorial.",
    why: "SpeechRecognition captures audio. recognize_google sends that audio to Google, so this part needs the internet. It is not a local model. The rest of JARVIS stays on your computer.",
    help: [
      "Python 3.14 may not have a ready PyAudio installer. If pip install pyaudio fails, leave the loop on input() and continue.",
      "A timeout, a missing mic, or a failed install all fall back to typing.",
      "Allow the microphone if Windows asks. This page never asks for the mic. Only jarvis.py can."
    ]
  },
  {
    id: "remind",
    minutes: 5,
    section: "Finish",
    title: "Save a reminder",
    building: "remind stores a note. reminders reads the notes back.",
    actions: [
      "Add the two functions below.",
      "Put the two new tests in reply, above return None.",
      "Update the help sentence so you can remember the new commands.",
      "Run: remind buy milk, then reminders, then exit."
    ],
    snippets: [
      {
        name: "New functions",
        code: lines([
          "def add_reminder(note):",
          "    with open(\"reminders.txt\", \"a\", encoding=\"utf-8\") as file:",
          "        file.write(note + \"\\n\")",
          "    return \"Reminder saved.\"",
          "",
          "def list_reminders():",
          "    try:",
          "        with open(\"reminders.txt\", encoding=\"utf-8\") as file:",
          "            notes = file.read().strip()",
          "    except FileNotFoundError:",
          "        return \"No reminders yet.\"",
          "    if notes == \"\":",
          "        return \"No reminders yet.\"",
          "    return notes"
        ])
      },
      {
        name: "Inside reply, above return None",
        code: lines([
          "    if parts and parts[0] == \"remind\":",
          "        note = command.split(\" \", 1)",
          "        if len(note) == 1 or note[1].strip() == \"\":",
          "            return \"Say remind and then the note.\"",
          "        return add_reminder(note[1].strip())",
          "    if parts and parts[0] == \"reminders\":",
          "        return list_reminders()"
        ])
      },
      {
        name: "Help line inside reply",
        code: "        return \"Try hello, help, open notepad, open calc, remind, reminders, or exit.\""
      }
    ],
    where: "The functions can go under open_app. The tests go inside reply, after the open test and before return None. parts already exists from the open step.",
    run: "python jarvis.py",
    success: lines([
      "You: remind buy milk",
      "JARVIS: Reminder saved.",
      "You: reminders",
      "JARVIS: buy milk"
    ]),
    why: "\"a\" adds to the file instead of wiping it. split(\" \", 1) separates the command from the rest of the sentence, so the note can contain spaces.",
    help: [
      "If remind reaches the model, the new tests are below return None or parts is not defined. Move them above return None.",
      "reminders.txt appears in the project folder after the first saved note."
    ]
  },
  {
    id: "window",
    minutes: 7,
    section: "Finish",
    title: "Add a small window",
    building: "A second way to use the same functions, without deleting the terminal loop.",
    actions: [
      "Put the terminal loop inside main, using the wrapper below.",
      "Create a new file, jarvis_window.py, and paste its code.",
      "Run the window file. Type a message and press Enter.",
      "python jarvis.py still runs the terminal version."
    ],
    snippets: [
      {
        name: "Bottom of jarvis.py",
        code: lines([
          "def main():",
          "    load_memory()",
          "    print(\"JARVIS: Hello. I am online.\")",
          "    # Move your existing while True loop under here.",
          "    # Indent the whole loop one more level.",
          "",
          "if __name__ == \"__main__\":",
          "    main()"
        ])
      },
      {
        name: "jarvis_window.py",
        code: lines([
          "import jarvis",
          "import tkinter as tk",
          "",
          "def on_send(event=None):",
          "    command = entry.get().strip()",
          "    entry.delete(0, tk.END)",
          "    if command == \"\":",
          "        return",
          "    log.insert(tk.END, \"You: \" + command + \"\\n\")",
          "    if command.lower() == \"exit\":",
          "        log.insert(tk.END, \"JARVIS: Goodbye.\\n\")",
          "        jarvis.save_memory()",
          "        root.destroy()",
          "        return",
          "    answer = jarvis.reply(command)",
          "    if answer is None:",
          "        answer = jarvis.ask_model(command)",
          "    log.insert(tk.END, \"JARVIS: \" + answer + \"\\n\\n\")",
          "    log.see(tk.END)",
          "",
          "jarvis.load_memory()",
          "root = tk.Tk()",
          "root.title(\"JARVIS\")",
          "root.geometry(\"420x520\")",
          "log = tk.Text(root, height=20, wrap=\"word\")",
          "log.pack(fill=\"both\", expand=True)",
          "entry = tk.Entry(root)",
          "entry.pack(fill=\"x\")",
          "entry.bind(\"<Return>\", on_send)",
          "entry.focus()",
          "root.mainloop()"
        ])
      }
    ],
    where: "Move your real loop into main, in place of the pass line. Delete the old load_memory() and greeting that used to sit outside the loop, or they will run twice. if __name__ means the loop runs for python jarvis.py, and not when the window imports the file.",
    run: "python jarvis_window.py",
    success: "A window titled JARVIS. Typed text appears in the log, then a reply. exit closes the window. This window was not opened while the tutorial was written. tkinter is already included with this Python.",
    why: "The window calls the same reply and ask_model functions. It does not contain a second copy of the assistant. A model reply can make the window wait. That wait is the model thinking, not a crash.",
    help: [
      "Do not paste the wrapper on top of the loop. Move the loop you already have under main, then delete the old copy that sits outside it.",
      "If the terminal loop starts as soon as you open the window, the loop is not inside main, or the if __name__ lines are missing.",
      "If the window says Not Responding during a question, wait. Do not close it yet.",
      "The window shows text. It does not use the microphone or the speaker."
    ]
  },
  {
    id: "together",
    minutes: 4,
    section: "Finish",
    title: "Run JARVIS",
    building: "One pass through the assistant you have actually built.",
    actions: [
      "Run python jarvis.py from the project folder.",
      "Type hello.",
      "Type open calc, then close Calculator.",
      "Ask a question in your own words.",
      "Type remind call home, then reminders.",
      "Type exit, run the file again, and ask what the reminder was."
    ],
    snippets: [],
    where: "No new code. If a piece was skipped, that part of the test will not happen, and the rest should still run.",
    run: "python jarvis.py",
    success: lines([
      "hello answers locally.",
      "open calc opens Calculator, or tells you it is not allowed for any other name.",
      "A normal question is answered by qwen3:8b.",
      "reminders prints the note you saved.",
      "After a restart, memory.json can supply the earlier model chat."
    ]),
    why: "reply handles commands on the computer. ask_model handles everything else and stores those turns. save_memory and load_memory keep the model chat in memory.json. say and listen are optional. The window is a second front door, not a second assistant.",
    help: [
      "main.py was never part of these steps. Leave it as your earlier chat loop.",
      "The phone page cannot see whether Calculator opened or what the model said. Judge that from the Cursor terminal.",
      "A full finished copy is not printed here on purpose. Your jarvis.py is the copy, built one step at a time."
    ]
  }
];

let progress = { version: 1, place: 0, done: {} };
let helpOpen = false;
let sheetOpen = false;

function browserStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (error) {
    return null;
  }
}

function loadProgress() {
  const store = browserStorage();
  const raw = store ? store.getItem(KEY) : null;
  const fresh = { version: 1, place: 0, done: {} };
  if (!raw) return fresh;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("shape");
    const place = Number(data.place);
    fresh.place = place >= 0 && place < STEPS.length ? place : 0;
    if (data.done && typeof data.done === "object" && !Array.isArray(data.done)) fresh.done = data.done;
    return fresh;
  } catch (error) {
    try {
      if (store && !store.getItem(KEY + ".unreadable")) store.setItem(KEY + ".unreadable", raw);
    } catch (ignored) {
      ignored;
    }
    return fresh;
  }
}

function saveProgress() {
  const store = browserStorage();
  if (store) store.setItem(KEY, JSON.stringify(progress));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[ch]));
}

function current() {
  return STEPS[progress.place] || STEPS[0];
}

function isDone(id) {
  return Boolean(progress.done[id]);
}

function go(index) {
  if (index < 0 || index >= STEPS.length) return;
  progress.place = index;
  helpOpen = false;
  sheetOpen = false;
  saveProgress();
  render();
}

function markDone() {
  progress.done[current().id] = true;
  saveProgress();
  render();
}

function listHtml(items, ordered) {
  const tag = ordered ? "ol" : "ul";
  return "<" + tag + ">" + items.map((item) => "<li>" + esc(item) + "</li>").join("") + "</" + tag + ">";
}

function snippetHtml(snippet) {
  return "<div class=\"codebox\"><div class=\"codehead\"><span>" + esc(snippet.name) + "</span><button type=\"button\" data-act=\"copy\">Copy</button></div><pre>" + esc(snippet.code) + "</pre></div>";
}

function sheetHtml() {
  let section = "";
  const rows = STEPS.map((step, index) => {
    let label = "";
    if (step.section !== section) {
      section = step.section;
      label = "<p class=\"section\">" + esc(section) + "</p>";
    }
    const tick = isDone(step.id) ? "<span class=\"tick\">Done</span>" : "";
    const currentAttr = index === progress.place ? " aria-current=\"true\"" : "";
    return label + "<button type=\"button\" class=\"jump\" data-act=\"go\" data-go=\"" + index + "\"" + currentAttr + "><span>" + (index + 1) + ". " + esc(step.title) + "</span>" + tick + "</button>";
  }).join("");
  return "<div class=\"sheet\"><div class=\"panel\"><div class=\"handle\"></div><h2>Steps</h2>" + rows + "</div></div>";
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  const step = current();
  const index = STEPS.indexOf(step);
  const width = Math.round(((index + 1) / STEPS.length) * 100);
  const optional = step.optional ? " · Optional" : "";
  const marked = isDone(step.id) ? " · Done" : "";
  const snippets = (step.snippets || []).map(snippetHtml).join("");
  const parts = step.parts ? "<p class=\"label\">Important parts</p>" + listHtml(step.parts, false) : "";
  const help = helpOpen ? "<ul class=\"help\">" + step.help.map((item) => "<li>" + esc(item) + "</li>").join("") + "</ul>" : "";
  app.innerHTML = "<main class=\"wrap\">" +
    "<header class=\"top\"><h1>JARVIS Builder</h1><button type=\"button\" class=\"ghost\" data-act=\"sheet\">Steps</button></header>" +
    "<p class=\"phone\">Write this on your computer, in Cursor.</p>" +
    "<div class=\"meta\"><span>" + esc(step.section + " · " + step.minutes + " min" + optional + marked) + "</span><span>" + (index + 1) + " / " + STEPS.length + "</span></div>" +
    "<div class=\"progress\"><span style=\"width:" + width + "%\"></span></div>" +
    "<article><h2>" + esc(step.title) + "</h2><p class=\"lead\">" + esc(step.building) + "</p>" +
    "<p class=\"label\">Do this</p>" + listHtml(step.actions, true) +
    snippets + parts +
    "<p class=\"label\">Where</p><p>" + esc(step.where) + "</p>" +
    "<p class=\"label\">Run</p><div class=\"codebox\"><div class=\"codehead\"><span>Terminal</span><button type=\"button\" data-act=\"copy\">Copy</button></div><pre>" + esc(step.run) + "</pre></div>" +
    "<p class=\"label\">You should see</p><div class=\"sample\"><pre>" + esc(step.success) + "</pre></div>" +
    "<p class=\"why\">" + esc(step.why) + "</p>" +
    "<button type=\"button\" class=\"help-toggle\" data-act=\"help\">" + (helpOpen ? "Hide help" : "Help") + "</button>" + help +
    "</article></main>" +
    "<div class=\"dock\">" +
    "<button type=\"button\" data-act=\"prev\"" + (index === 0 ? " disabled" : "") + ">Previous</button>" +
    "<button type=\"button\" class=\"primary\" data-act=\"done\"" + (isDone(step.id) ? " disabled" : "") + ">" + (isDone(step.id) ? "Completed" : "Mark complete") + "</button>" +
    "<button type=\"button\" data-act=\"next\"" + (index === STEPS.length - 1 ? " disabled" : "") + ">Next</button>" +
    "</div>" +
    (sheetOpen ? sheetHtml() : "");
  const dock = document.querySelector(".dock");
  const wrap = document.querySelector(".wrap");
  if (dock && wrap) wrap.style.paddingBottom = (dock.offsetHeight + 16) + "px";
}

function copyText(text, button) {
  const done = () => {
    const old = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => { button.textContent = old; }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  try { document.execCommand("copy"); } catch (error) { error; }
  area.remove();
  done();
}

function onClick(event) {
  if (event.target.classList && event.target.classList.contains("sheet")) {
    sheetOpen = false;
    render();
    return;
  }
  const el = event.target.closest("[data-act]");
  if (!el || el.disabled) return;
  const act = el.getAttribute("data-act");
  if (act === "copy") {
    const pre = el.parentElement.parentElement.querySelector("pre");
    if (pre) copyText(pre.textContent, el);
  } else if (act === "next") go(progress.place + 1);
  else if (act === "prev") go(progress.place - 1);
  else if (act === "done") markDone();
  else if (act === "help") {
    helpOpen = !helpOpen;
    render();
  } else if (act === "sheet") {
    sheetOpen = true;
    render();
  } else if (act === "go") go(Number(el.getAttribute("data-go")));
}

function boot() {
  progress = loadProgress();
  const app = document.getElementById("app");
  app.addEventListener("click", onClick);
  render();
}

if (typeof document !== "undefined" && document.getElementById("app")) boot();
