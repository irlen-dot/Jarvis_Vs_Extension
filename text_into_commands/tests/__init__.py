import unittest

from text_into_commands.agent import Agent


class TestStringMethods(unittest.TestCase):

    def setUp(self):
        self.agent = Agent()

    def test_agent(self):
        commands = self.agent.execute("Move to the line 10 and write 'Hello World'")
        self.assertEqual(
            commands[0],
            {"type": "cursor_movement_to_line", "value": "10", "date": None},
        )

    # def test_upper(self):
    #     self.assertEqual("foo".upper(), "FOO")

    # def test_isupper(self):
    #     self.assertTrue("FOO".isupper())
    #     self.assertFalse("Foo".isupper())

    # def test_split(self):
    #     s = "hello world"
    #     self.assertEqual(s.split(), ["hello", "world"])
    #     # check that s.split fails when the separator is not a string
    #     with self.assertRaises(TypeError):
    #         s.split(2)


if __name__ == "__main__":
    unittest.main()
