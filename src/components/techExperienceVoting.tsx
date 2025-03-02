'use client'
import { cn } from '@/lib/utils'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'
import { databases, Query } from '@/app/appwrite-client'
import { updateVote } from '@/lib/actions/updateVote'

export default function TechExperienceVoting({
  categories,
  setCategories,
  userVotes,
  setUserVotes,
}) {
  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await databases.listDocuments('main', 'voting', [
        Query.limit(5000),
      ])
      const documents = response.documents

      const groupedCategories = documents.reduce((acc, doc) => {
        const category = acc.find((cat) => cat.name === doc.category)
        const techItem = {
          id: doc.$id,
          name: doc.name,
          votes: doc.count,
        }

        if (category) {
          category.items.push(techItem)
        } else {
          acc.push({
            id: doc.category.toLowerCase(),
            name: doc.category,
            icon: null, // You can set the appropriate icon here
            items: [techItem],
          })
        }

        return acc
      }, [])

      setCategories(groupedCategories)
    }

    fetchCategories().then()
  }, [setCategories])

  const handleVote = async (
    categoryId: string,
    itemId: string,
    voteType: 'up' | 'down'
  ) => {
    const voteKey = `${categoryId}-${itemId}`
    const currentVote = userVotes[voteKey]

    let voteChange = 0

    if (currentVote === voteType) {
      voteChange = voteType === 'up' ? -1 : 1
      setUserVotes((prev) => ({ ...prev, [voteKey]: null }))
      updateVote(itemId, null).then()
    } else if (currentVote === null || currentVote === undefined) {
      voteChange = voteType === 'up' ? 1 : -1
      setUserVotes((prev) => ({ ...prev, [voteKey]: voteType }))
      updateVote(itemId, voteType).then()
    } else {
      voteChange = voteType === 'up' ? 2 : -2
      setUserVotes((prev) => ({ ...prev, [voteKey]: voteType }))
      updateVote(itemId, voteType).then()
    }

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId
                  ? { ...item, votes: item.votes + voteChange }
                  : item
              ),
            }
          : category
      )
    )
  }

  return (
    <div className="space-y-8">
      {categories &&
        categories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              {category.icon}
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => {
                const voteKey = `${category.id}-${item.id}`
                const userVote = userVotes[voteKey]

                return (
                  <div key={item.id} className="group relative">
                    <div
                      className={cn(
                        'flex items-center overflow-hidden border rounded-full transition-all duration-300 ease-in-out',
                        userVote === 'up'
                          ? 'bg-primary text-primary-foreground'
                          : userVote === 'down'
                            ? 'bg-destructive text-destructive-foreground'
                            : 'bg-background hover:bg-muted'
                      )}
                    >
                      <button
                        onClick={() => handleVote(category.id, item.id, 'down')}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        aria-label="Downvote"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                      <span className="px-2 py-1 text-sm">
                        {item.name}
                        <span className="ml-1.5 text-xs font-semibold">
                          {item.votes > 0 ? `+${item.votes}` : item.votes}
                        </span>
                      </span>
                      <button
                        onClick={() => handleVote(category.id, item.id, 'up')}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        aria-label="Upvote"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}
