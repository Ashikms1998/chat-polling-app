import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PollView = ({ poll, onVote }) => {
  const {
    _id: pollId,
    senderId: { username },
    pollId: { question, options, votes },
  } = poll;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption !== null) {
      onVote(pollId, selectedOption);
    }
  };

  const voteMap = new Map(Object.entries(votes));
  const totalVotes = Array.from(voteMap.values()).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{question}</CardTitle>
        <CardDescription>Created by {username}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={setSelectedOption} className="space-y-2">
          {options.map((option, index) => {
            const voteCount = voteMap.get(option) || 0;
            const percentage =
              totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

            return (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow">
                  {option}
                </Label>
                <span className="text-sm text-gray-500">
                  {voteCount} ({percentage.toFixed(1)}%)
                </span>
              </div>
            );
          })}
        </RadioGroup>
        <Button onClick={handleVote} className="mt-4 w-full">
          Vote
        </Button>
      </CardContent>
    </Card>
  );
};

export default PollView;
